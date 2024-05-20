import React, { forwardRef } from "react";

const Apropos = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="p-8 bg-gradient-to-b from-black to-gray-500 text-white"
    >
      <h2 className="text-2xl font-bold mb-4">À propos de nous</h2>
      <p className="text-lg">
        Bienvenue sur Leyenda, votre nouvelle plateforme dédiée à la réalisation de projets web et mobiles ! Notre mission est de fournir une expérience exceptionnelle en matière de développement et de gestion de projets en ligne, en vous offrant des services de haute qualité, spécialement conçus pour répondre aux besoins des professionnels de la technologie.
      </p>
      <p className="text-lg mt-4">
        Que vous ayez besoin de créer un site web, de développer une application mobile, ou de mettre en place une solution logicielle sur mesure, nous avons les compétences et l'expertise nécessaires pour réaliser vos projets. Notre site convivial vous permet de parcourir facilement nos services, de soumettre vos demandes de projets et de collaborer avec nos experts en toute simplicité.
      </p>
      <p className="text-lg mt-4">
        Chez Leyenda, nous comprenons l'importance de la technologie dans votre vie quotidienne et professionnelle. C'est pourquoi nous nous efforçons de vous offrir les meilleures solutions pour améliorer votre productivité et votre confort. Nos services sont soigneusement conçus et réalisés pour garantir leur qualité et leur performance.
      </p>
      <p className="text-lg mt-4">
        Notre équipe est composée de passionnés de technologie et de professionnels du développement web et mobile, dédiés à vous fournir un service client exceptionnel. Nous sommes toujours à l'écoute de vos besoins et prêts à répondre à vos questions pour vous aider à concrétiser vos idées de projet.
      </p>
      <p className="text-lg mt-4">
        Explorez notre site dès aujourd'hui pour découvrir notre gamme de services innovants et profitez d'une expérience de gestion de projet en ligne pratique et sécurisée. Votre satisfaction est notre priorité absolue, et nous sommes là pour vous accompagner à chaque étape de la réalisation de votre projet.
      </p>
    </div>
  );
});

export default Apropos;
