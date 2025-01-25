import { Header } from './components/header/Header';
import { Post, PostType } from './components/post/Post'
import { Sidebar } from './components/sidebar/Sidebar';

import styles from './App.module.css';

import './global.css';

// PostType: tipagem de post, Type no final pra nao ficar com mesmo nome do componente
const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/jeanmbiz.png',
      name: 'Jean Michel Biz',
      role: 'Full Stack Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. O nome do projeto é PostDate 🚀' },
    ],
    publishedAt: new Date('2025-01-20 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/edtech1985.png',
      name: 'Edson Costa',
      role: 'Developer Support Engineer'
    },
    content: [
      { type: 'paragraph', content: '🚀 Nova jornada profissional na Digibee!' },
      { type: 'paragraph', content: 'É com muita alegria que compartilho minha mais recente conquista: me juntei à Digibee como Engenheiro de Suporte ao Desenvolvedor! 🎉 Essa nova etapa tem sido desafiadora e empolgante, e eu não poderia estar mais feliz em contribuir para uma empresa tão inovadora e visionária.' },
    ],
    publishedAt: new Date('2025-01-22 20:00:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {/* forEach nao pode ser utilizado pois não tem retorno, map retorna array. */}
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
