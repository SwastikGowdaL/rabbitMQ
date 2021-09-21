const amqp = require("amqplib");
require("dotenv").config();


const msg = {
    number: 102
}

const hobby={
    "game":"cricket"
}

const connect = async () => {
    try {
        //* amqp server localhost = "amqp://localhost:5672"
        //*amqp cloud server = process.env.AMQP_SERVER
        const amqpServer = process.env.AMQP_SERVER;
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.assertQueue("hobbies");

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`job enqueued successfully ${msg.number}`);
        channel.sendToQueue("hobbies",Buffer.from(JSON.stringify(hobby)))
        console.log(`job enqueued successfully ${hobby.game}`);
        
        await channel.close();
        await connection.close();
    } catch (err) {
        console.error(err);
    }
}

module.exports = connect ;