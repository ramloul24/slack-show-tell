const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cron = require('node-cron');
const { userIds, testIds } = require('./config');
const { selectId } = require('./utilities');
const { sendDM } = require('./slack');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./route')(app);

var selectedIdsSoFar = []; // global array to keep track of userIds selected already

cron.schedule('*/1 * * * *', () => {
    let [selectedId, selectedIds] = selectId(testIds, selectedIdsSoFar);
    selectedIdsSoFar = selectedIds;
    console.log(selectedId);
    // console.log(selectedIdsSoFar);
    sendDM('UPJNXUALV', 'Hi, Heady Bear! :headybear2: We appreciate your work.', [
        {
            "text": "Feel like sharing your plan for the day.",
            "callback_id": "show_tell",
            "color": "#a157c9",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "positive",
                    "text": "Yes!",
                    "type": "button",
                    "value": "postive"
                },
                {
                    "name": "negative",
                    "text": "Not today",
                    "type": "button",
                    "value": "negative"
                }
            ]
        }
    ]);
});

const PORT = 9647;
app.listen(PORT, () => {
  console.log(`Slack bot server has started on port ${PORT}`);
});
