const blocks = {
    actions: {
        sendMessage: {
            name: "Send Message",
            fields: [
                { name: "message", type: "text", required: true }
            ]
        },
        sendEmbed: {
            name: "Send Embed",
            fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "text", required: true },
                { name: "color", type: "color", required: false }
            ]
        }
    },
    conditions: {
        hasPermission: {
            name: "Check Permission",
            fields: [
                { name: "permission", type: "select", options: ["ADMIN", "MANAGE_MESSAGES"] }
            ]
        }
    },
    variables: {
        user: {
            name: "User Information",
            fields: ["username", "id", "roles"]
        },
        server: {
            name: "Server Information",
            fields: ["name", "memberCount", "channels"]
        }
    }
};

exports.getAvailableBlocks = () => blocks;
