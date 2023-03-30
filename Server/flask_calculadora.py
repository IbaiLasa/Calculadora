from flask import Flask
import math
from urllib.parse import unquote

app = Flask(__name__)
display = []

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route("/display/<path:a>")
def añadir(a):
    b = unquote(a)
    if b == "8/":
        b = "/"
    if b == "8.":
        b = "."
    display.append(b)
    return "Hola"

@app.route("/eliminar")
def eliminar():
    display.clear()
    return "Hola"

@app.route("/borrar")
def borrar():
    display.pop()
    return "Hola"

@app.route("/calcular")
def calcular():
    calculo = ''.join(display)
    try:
        solucion = eval(calculo, {"__builtins__": None}, 
                        {"sin": math.sin, "cos": math.cos, "sqrt": math.sqrt, "pi": math.pi})
        return {"solucion": solucion}
    except ZeroDivisionError:
        return {"solucion": "Syntax Error"}
    except NameError:
        return {"solucion": "Syntax Error"}
    except TypeError:
        return {"solucion": "Syntax Error"}
    except SyntaxError:
        return {"solucion": "Syntax Error"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
