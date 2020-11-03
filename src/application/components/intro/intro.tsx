import * as React from 'react';
import styles from './intro.scss';

export class Intro extends React.Component {
    render() {
        return (
            <div className={styles.intro}>
                <h1>Добро пожаловать !</h1>
                <div className={styles.text}>
                    <p>Всем привет, это случилось мы наконецто запустили этот игровой
                    мир World of Warcraft наша команда давно шла к этому, и теперь
                    мы рады сообщить Вам, первым 1000 пользоателям будут отправлены
подарки от нашей команды.</p>
                    <p>
                        Присоединяйтесь к увлекательному миру World of Warcraft и получите
огромное количество позитивных эмоций.</p>
                    <p>
                        До встречи в увлекательном мире.</p>
                </div>
            </div>
        );
    }
}