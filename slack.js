const axios = require('axios');
const config = require('./config');

const sendDM = async (userId, message, attachments) => {
  try {
    const postResponse = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: `${userId}`,
        text: message,
        attachments: JSON.stringify(attachments)
      },
      {
        headers: {
          Authorization: `Bearer ${config.botToken}`
        }
      }
    );
    return postResponse.data;
  } catch (error) {
    throw error;
  }
};
//UPJNXUALV
const openModal = async(trigger) => {
    try {
        const postModal = await axios.post(
            'https://slack.com/api/views.open',
            {
                trigger_id: `${trigger}`,
                view: {
                    type: 'modal',
                    callback_id: 'modal-identifier',
                    title: {
                        "type": "plain_text",
                        "text": "Show & Tell"
                    },
                    submit: {
                        "type": "plain_text",
                        "text": "Submit",
                        "emoji": true
                    },
                    close: {
                        "type": "plain_text",
                        "text": "Cancel",
                        "emoji": true
                    },
                    blocks: [
                        {
                            "type": "input",
                            "block_id": "multiline",
                            "element": {
                                "type": "plain_text_input",
                                "multiline": true,
                                "action_id": "mlvalue",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Share your plan for the day."
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Today's plan"
                            }
                        }
                      ]
                }
            },
            {
                headers: {
                  Authorization: `Bearer ${config.botToken}`
                }
            }
        );
        return postModal;
    } catch (error) {
        throw error;
    }
};
const sendSlackMessage = async(webhookURL, user, message) => {
  try {
    user = user.charAt(0).toUpperCase() + user.slice(1);
    const postMessage = await axios.post(
      webhookURL,
      {blocks: [
        {
          "type": "section",
			    "text": {
            "type": "plain_text",
            "emoji": true,
            "text": `Hi team! :headybear2: ${user} wants to share their plan for the day with us. :clap:`
			    }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${message}`
          }
        }
      ]},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
    return postMessage;
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  sendDM, openModal, sendSlackMessage
};

