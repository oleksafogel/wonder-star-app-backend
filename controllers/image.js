const clarifaiSetUp = (imgUrl) => {
    const PAT = 'c168ca4bd8ac46b0a11775fa41cfbf94';
    const USER_ID = 'ofogel';       
    const APP_ID = 'wonder-star-app';
    const IMAGE_URL = imgUrl;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
  }

const handleApiCall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/celebrity-face-detection/outputs", clarifaiSetUp(req.body.input))
    .then(response => response.json())  // <-- Parse the response as JSON
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImageSubmit = (db) => (req, res) => {
    const { id } = req.body;
    return db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('Unable to get entries');
    })
}

export {handleImageSubmit, handleApiCall};