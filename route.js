const { openModal, sendSlackMessage } = require('./slack');
const config = require('./config');

module.exports = app => {
    app.post('/action', (req, res) => {
        const interactiveMessage = JSON.parse(req.body.payload);
        let response, originalTextMessage;
        console.log(interactiveMessage)
        // eslint-disable-next-line default-case
        switch (interactiveMessage.type) {
            case 'interactive_message':
                originalTextMessage = interactiveMessage.original_message.text;
                if (interactiveMessage.actions[0].name === 'positive') {
                    openModal(interactiveMessage.trigger_id);
                    res.json({
                        text: originalTextMessage,
                        attachments: [
                            {
                                text: 'Thanks for sharing :nadine:'
                            }
                        ]
                    });
                }
                else {
                    res.json({
                        text: originalTextMessage,
                        attachments: [
                            {
                                text: 'Have a good day! :smiley:'
                            }
                        ]
                    });
                }
                break;
            case 'view_submission':
                response = sendSlackMessage(config.webhookURL, interactiveMessage.user.username, interactiveMessage.view.state.values.multiline.mlvalue.value);
                res.send(response.status);
                break;
        }
    });
};
