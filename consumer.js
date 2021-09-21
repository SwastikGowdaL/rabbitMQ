const amqp = require("amqplib");
require("dotenv").config();

const connect = async () => {
    try {
        //* amqp server localhost = "amqp://localhost:5672"
       //*amqp cloud server = process.env.AMQP_SERVER
       const amqpServer = process.env.AMQP_SERVER;
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            console.log(message.content.toString());
            const msg = JSON.parse(message.content.toString());
            const temp = Number(msg.number);
            if (temp === 102) {
                channel.ack(message)
            }
        })

        console.log("waiting for messages...");
    } catch (err) {
        console.error(err);
    }
}

connect();