from django.http import JsonResponse
import requests
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def ask_gpt(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Загрузка данных из тела запроса

        word = data.get('word', '')

        prompt = {
            "modelUri": "gpt://b1gru9939vg1dpodhqkh/yandexgpt-pro",
            "completionOptions": {
                "stream": False,
                "temperature": 0.6,
                "maxTokens": "2000"
            },
            "messages": [
                {
                    "role": "system",
                    "text": f"""
                        You are a color palette generating assistant that responds to text prompts for color palettes.
                        You should generate color palettes that fit the theme, mood, or instructions in the prompt.
                        The palettes should be 5 colors.
                    
                        Q: Convert the following verbal description of a color palette into a list of colors: The Meditation
                        A: ["#594F4F", "#A1887F", "#BCAAA4", "#81C784", "#455A64"]
                    
                        Q: Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea
                        A: ["#1A237E", "#1565C0", "#1E88E5", "#90CAF9", "#E1F5FE"]
                    
                        Desired Format: a JSON array of hexadecimal color codes
                    
                        Q: Convert the following verbal description of a color palette into a list of colors: 
                        A:
                        """
                },
                {
                    "role": "user",
                    "text": " {}".format(word)
                }
            ]
        }

        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key AQVNyVTH3KF7atkFxNP4hxUhofFsZ30Lra8_vf-J"
        }

        response = requests.post(url, headers=headers, json=prompt)

        # Преобразование ответа в JSON
        result_json = response.json()

        # Пример извлечения данных из JSON
        # Предположим, что ответ содержит поле 'result', которое мы хотим извлечь
        '''
        result = result_json.get('result', 'Не удалось получить результат')

        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

        '''

        # Извлечение строки с цветами
        color_string = result_json['result']['alternatives'][0]['message']['text']

        # Удаление обратных слешей
        cleaned_color_string = color_string.replace('\\', '')
        # Преобразование строки обратно в список цветов
        color_list = json.loads(cleaned_color_string)

        return JsonResponse({'result': color_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)