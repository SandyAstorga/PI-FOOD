import React from "react";
import { Link } from "react-router-dom";
import style from "./About.module.css";

const About = () => {
    return (
        <div className={style.container_about}>
            <h1 className={style.am}>About Me</h1>
            <br />
            <p className={style.text}>
                Hello! I am Sandra Astorga.
                <br />
                <br />
                I am preparing myself as a Full Stack Web Developer, I am passionate about creating web applications.
                <br />
                In this application I have used technologies such as:
                <br />
                <br />
                <br />
                <li className={style.list}>JavaScript</li>
                <li className={style.list}>HTML</li>
                <li className={style.list}>CSS</li>
                <li className={style.list}>React</li>
                <li className={style.list}>Redux</li>
                <li className={style.list}>Node</li>
                <li className={style.list}>Express</li>
                <li className={style.list}>Sequelize</li>
                <li className={style.list}>PostgreSQL</li>
                <br />
                <br />
                <br />
                Ever since I discovered my interest in technology and web development
                <br />
                I have been learning everything possible to hone my skills and create interesting projects.
                <br />
                I am always looking for new ways to learn and improve.
            </p>
            <br/>
            <div>
            <a href="https://www.linkedin.com/in/sandraastorga13/">
            <img className={style.img} src="https://icones.pro/wp-content/uploads/2021/03/icone-linkedin-ronde-grise.png" alt="" />
            </a>
            <a href="https://github.com/SandyAstorga">
            <img className={style.img} src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png" alt=""/>
            </a>
            </div>
            <br/>
            <Link to='/home'>
                <button>
                    <span >Back</span>
                </button>
            </Link>
        </div>
    )
}

export default About;

/*
¡Hola! Soy Sandra Astorga, me estoy preparando como Full Stack Web Developer, 
me apasiona la creación de aplicaciones web. 
En esta aplicacion he utilizado tecnologías como 
JavaScript, HTML,CSS, React, Redux, Node, Express, Sequelize y PostgreSQL.
Desde que descubrí mi interés por la tecnología y el desarrollo web 
he estado aprendiendo todo lo posible para perfeccionar mis habilidades y crear proyectos interesantes.
Siempre estoy buscando nuevas formas de aprender y mejorar. 
 */