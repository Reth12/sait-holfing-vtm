from flask import Flask, request, send_from_directory, jsonify
import requests
import os

app = Flask(__name__)
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
CHAT_ID = os.getenv('CHAT_ID'
# Главная страница
@app.route('/')
def index():
    return send_from_directory('.', 'DA.html')

# Статические файлы (CSS, JS, изображения)
@app.route('/css/<path:filename>')
def css_static(filename):
    return send_from_directory('css', filename, mimetype='text/css')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# Обработка заявки
@app.route('/request', methods=['POST'])
def handle_request():
    data = request.json
    msg = (
        f"Новая заявка:\n"
        f"Имя: {data.get('name')}\n"
        f"Телефон: {data.get('country')} {data.get('phone')}\n"
        f"Email: {data.get('email')}\n"
        f"Детали: {data.get('details')}"
    )
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    r = requests.post(url, json={'chat_id': CHAT_ID, 'text': msg})
    print('Telegram response:', r.text)
    if r.ok:
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'error'}), 500

@app.route('/mobile.html')
def mobile():
    return send_from_directory('.', 'mobile.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



