const amqp = require("amqplib");

const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            console.log(message.content.toString());
            const msg = JSON.parse(message.content.toString());
            const temp = Number(msg.number);
            if (temp === 888) {
                channel.ack(message)
            }
        })

        console.log("waiting for messages...");
    } catch (err) {
        console.error(err);
    }
}

connect();