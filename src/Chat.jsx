const Chat = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="font-semibold text-lg">Chat</h3>
            <div className="overflow-y-auto max-h-48">
                <ul>
                    <li>User1: Hello everyone!</li>
                    <li>User2: How's the stream going?</li>
                </ul>
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                className="border rounded-lg p-2 w-full mt-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Send</button>
        </div>
    );
};
