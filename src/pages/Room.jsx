/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import { databases, client } from "../utils/appwriteConfig";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash2 } from "react-feather";
import Loader from "../components/Loader";
import { UseAuthContext } from "../utils/authContext";
const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { user } = UseAuthContext();
  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES
      }.documents`,
      (response) => {
        console.log("Real Time:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [...prevState, response.payload]);
          console.log("A Message Was Created");
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
          console.log("A Message Was Deleted");
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES,
        ID.unique(),
        { body: messageBody, user_id: user.$id, username: user.name },
        [Permission.write(Role.user(user.$id))]
      );
      console.log(response);
    } catch (error) {
      console.log("error comes from handleSubmit", error);
    }
    setMessageBody("");
  };
  const deleteMessage = async (message_id) => {
    databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES,
      message_id
    );
  };
  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES,
        [Query.orderAsc("$createdAt")]
      );
      setMessages(response.documents);
    } catch (error) {
      console.log("error comes from getMessages", error);
    }
  };

  return (
    <div className="py-10  text-white relative">
      <div className="text-center mb-8 text-3xl font-semibold capitalize">
        Welcome <span className="text-mainColor">{user.name}</span>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto bg-bgSecondaryColor p-4 rounded-md">
        {!messages.length && <Loader screen={false} bgTransparent={true} />}
        <div>
          {messages.map((item) => (
            <div key={item.$id} className="mb-6">
              <div
                className="flex items-center"
                style={{
                  justifyContent: item.$permissions.includes(
                    `delete(\"user:${user.$id}\")`
                  )
                    ? "space-between"
                    : "flex-end",
                }}
              >
                <div
                  className="px-4 py-2 rounded-lg   w-fit"
                  style={{
                    borderEndStartRadius: item.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    )
                      ? "0px"
                      : "8px",
                    borderBottomRightRadius: item.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    )
                      ? "8px"
                      : "0px",
                    backgroundColor: item.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    )
                      ? "#DB1A5A"
                      : "#333",
                  }}
                >
                  <span className="text-xl">{item.body}</span>
                </div>
                {item.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                  <button
                    type="button"
                    className="hover:text-mainColor transition"
                    onClick={() => deleteMessage(item.$id)}
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
              <div
                className="flex gap-2 items-center"
                style={{
                  justifyContent: item.$permissions.includes(
                    `delete(\"user:${user.$id}\")`
                  )
                    ? "flex-start"
                    : "flex-end",
                }}
              >
                {item?.username ? (
                  <span className="text-gray-500 capitalize">
                    From: {item.username}
                  </span>
                ) : (
                  <span> Anonymous User</span>
                )}
                <p className="text-[12px] text-gray-500 font-semibold">
                  {new Date(item.$createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="message-form-container">
        <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
          <textarea
            id="message"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            required
            maxLength={"1000"}
            placeholder="Enter A Message"
            className="textarea"
          ></textarea>
          <button type="submit" className="btn text-lg py-2 rounded-sm">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Room;
