import { format, formatDistanceToNow } from 'date-fns';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';



import styles from './Post.module.css';
import { ptBR } from 'date-fns/locale';
import { Avatar } from '../avatar/Avatar';
import { Comment } from '../comment/Comment';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  // data da publicação formatado
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  // formatDistanceToNow: tempo do post relativo ao tempo atual
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  // handle = ação do usuário
  // event: FormEvent - evento do formulário
  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  // ChangeEvent: o evento ocorreu no HTMLTextAreaElement
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  // validação da textarea
  // InvalidEvent: ocorreu evento no HTMLTextAreaElement
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    // setCustomValidity: mensagem da validação
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  // função é enviada como props para o componente filho pra pegar o ID do comentário a ser deletado
  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
        {/* CABEÇALHO */}
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        {/* tag time: usada para representar datas ou horas. */}
        {/* title: mostra a data do post que será exibido como um "tooltip" quando o usuário passa o mouse. */}
        {/* dateTime: data e hora de publicação do post em formato padrão ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) */}
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
        {/* publishedDateRelativeToNow: exibe o tempo do post em relação ao momento atual, como "2 horas atrás" ou "há 5 dias". */}
          {publishedDateRelativeToNow}
        </time>
      </header>

        {/* CONTEÚDO DO POST */}
      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

        {/* COMENTÁRIO */}
      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          // onInvalid: validação da textarea
          onInvalid={handleNewCommentInvalid}
          // required: para nao permitir enviar o formulário sem nada preenchido
          required
        />

        <footer>
          {/* disabled: desabilitar button quando o textarea estiver vazio */}
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

    {/* RESPOSTAS DO COMENTÁRIO */}
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              // on: são funções disparadas a partir de uma ação que acontece
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
