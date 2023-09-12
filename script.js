document.addEventListener('DOMContentLoaded', function() {
    const btn_start = document.querySelector('#start');
    let intervalId; 
    const btn_clear = document.querySelector('#reset')
    const btn_change = document.querySelector('#changemode')
    const msg = document.querySelector('#modeselect')


    btn_change.addEventListener('click', () => {
     changemode()
        
    })
    const changemode = () => {
        const mode = document.querySelector('#modeButton')
        if(mode.classList.contains('mode_estudar')){
            mode.classList.remove('mode_estudar')
            mode.classList.add('mode_descanso')
            msg.innerHTML = 'Descanso'
        } else if (mode.classList.contains('mode_descanso'))  {
            mode.classList.remove('mode_descanso')
          mode.classList.add('mode_estudar')
          msg.innerHTML = 'Estudar'
        } else{
            mode.classList.add('mode_estudar')
            msg.innerHTML = 'Estudar'
        }
    }
    //timer function
    btn_start.addEventListener('click', () => {
        const hours = document.querySelector('#hour');
        const minutes = document.querySelector("#minute");
        const seconds = document.querySelector("#seconds");
        const error = document.querySelector('#error');
        btn_start.style.display ='none'

        let duration = (parseInt(hours.value) * 60 * 60) + (parseInt(minutes.value) * 60) + parseInt(seconds.value);

        const display = document.querySelector('#display');

    
        intervalId = timer(duration, display);
    })
    const timer = (duration, display) => {
        const audio = document.querySelector('#timerAudio')
        let timer = duration;
        let hours, minutes, seconds;

        return setInterval(() => {
            hours = Math.floor(timer / 60 / 60);
            minutes = Math.floor(timer / 60 - (hours * 60));
            seconds = Math.floor(timer % 60)

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            display.innerHTML = `${hours}:${minutes}:${seconds}`;

            timer -= 1;

            if (timer < 0) {
                btn_start.style.display ='inline-block'
                clearInterval(intervalId); 
                display.innerHTML = 'Finalizado!'
                changemode() 
                audio.play()  
            }

        }, 1000);
    }
    // clear timer
    btn_clear.addEventListener('click', () => {
        resetTimer()
    })
    
    const resetTimer = () => {
        const mode = document.querySelector('#modeButton')
       if(mode.classList.contains('mode_estudar') || ('mode_descanso')){
        mode.classList.remove('mode_estudar')
        mode.classList.remove('mode_descanso')
        mode.classList.add('mode')
        msg.innerHTML = 'Selecione o modo'
       }
        clearInterval(intervalId)
        const display = document.querySelector('#display');
        display.innerHTML = '00:00:00';
        const hours = document.querySelector('#hour');
        const minutes = document.querySelector('#minute');
        const seconds = document.querySelector('#seconds');
        hours.value = '00'; 
        minutes.value = '00'; 
        seconds.value = '05'; 
        btn_start.style.display ='inline-block'
    }
});

