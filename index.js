var expr = "";

var display = document.querySelector("#display");
display.textContent = "0";

// Получаем все кнопки на странице
let buttons = document.querySelectorAll('button');

function isOperation(target){
    return ["/", "*", "+", "-"].includes(target);
}

function isSettings(target){
    return ["c", "b", "="].includes(target);
}

// Перебираем все кнопки и добавляем слушатель onClick
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let event = this.getAttribute("name");

        if(expr == "NaN" || expr == "Ошибка"){
            expr = ""
        }
            
        
        if(isOperation(event)){
            if(expr.length >= 1){
                if(isOperation(expr[expr.length-1])){ expr = expr.slice(0, -1) + event;}
                else expr=expr+event;
            } 
        }
        else if(isSettings(event)){
            if(event == 'c') expr=""
            else if(event == 'b' && expr.length != 0) {
                expr=expr.slice(0, -1);
            }
            else if(event == '=') {
                try {
                    expr=eval(expr).toString()
                } catch (error) {
                    expr = "Ошибка";
                } 
                  
        }
    }
        else{
            expr=expr+event;
        }
        
        if(expr.length > 1 && expr[0] == '0') expr = expr.slice(1);

        if(expr.length == 0) display.textContent = "0"
        else display.textContent = expr

        display.scrollLeft = display.scrollWidth;
    });
});
