import requests

word = input()

prompt = {
    "modelUri": "gpt://b1gru9939vg1dpodhqkh/yandexgpt",
    "completionOptions": {
        "stream": False,
        "temperature": 0.6,
        "maxTokens": "2000"
    },
    "messages": [
        {
            "role": "system",
            "text": " напиши слово которое я тебе пишу задом наперед"

        },
        {
            "role": "user",
            "text": word
        }
    ]
}


url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key AQVNyVTH3KF7atkFxNP4hxUhofFsZ30Lra8_vf-J"
}

response = requests.post(url, headers=headers, json=prompt)
result = response.text
print(result)