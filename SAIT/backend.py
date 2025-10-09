from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

TELEGRAM_TOKEN = 'ВАШ_ТОКЕН_БОТА'
CHAT_ID = 'ВАШ_CHAT_ID'

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
    if r.ok:
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'status': 'error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)