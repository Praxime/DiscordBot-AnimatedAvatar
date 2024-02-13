// check https://github.com/Praxime/DiscordBot-AnimatedAvatar/blob/main/README.md to see how to do it

const { readFileSync } = require("node:fs");
const { Client, IntentsBitField } = require("discord.js");
    const client = new Client({
        intents: [IntentsBitField.Flags.Guilds],
});

const token = 'Put your bot Token here.';    // Put your Bot Token
const newAvatar = readFileSync('./Profile.gif');  // You can only use GIFs for the new Animated Profile.
client.login(
    token);

(async () => {
    try {
        const response = await fetch("https://discord.com/api/v10/users/@me", {
            method: "PATCH",
            headers: {
                Authorization: `Bot ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: `data:image/gif;base64,${newAvatar.toString("base64")}`
            })
        });

        if (response.ok) console.log(`Edits Applied on ${client.user.tag}!
        You can now Close this.`);
        else {

            console.error("FAILED TO UPDATE", response.statusText);
                const responseBody = await response.text();
            console.error("Response body:", responseBody);

        };

    } catch (error) {
        console.error("There is a unexpected error:", error);
    };
})();
