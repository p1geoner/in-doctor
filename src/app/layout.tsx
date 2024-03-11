import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'swiper/css';
import 'swiper/css/navigation';

import '@/assets/styles/variables.scss'
import '@/assets/styles/normalize.scss';
import '@/assets/styles/globals.scss'
import '@/assets/styles/swiper.scss'
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
// import 'react-accessible-accordion/dist/fancy-example.css';


const inter = Inter({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: 'Медицинские услуги на дому 24/7 - Сервис «Наш доктор»',
  description: 'Предлагаем индивидуальный подход и удобство медицинских услуг на дому для всех пациентов. Гибкое расписание, профессиональная помощь в городе и сельской местности. Безопасный и удобный выбор для пожилых людей и инвалидов. Медсестра на дом в Вашем городе, вызов медсестер на дом для оказания медицинских услуг. Проверенные сертифицированные медсестры. Вызвать медсестру на дом для оказания платных медуслуг. Сервис «Наш доктор» делает здоровье доступным для вас.',
  keywords: 'к Врачу, Анализ, Уколы, Капельница, капельница +на дом, капельница +от запоя, прокапаться, Медсестра +на дом, анализы +на дому, сиделка, Медсестра на дом'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  inter.style.fontWeight = 700;
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className} >
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
