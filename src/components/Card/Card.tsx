import styles from "./Card.module.css";

interface Details {
  name: string;
  description: string;
  subdescription: string;
  avatar?: string;
  action: () => void;
}
interface CardProps {
  details: Details[];
}
export const Card = ({ details }: CardProps) => {
  return (
    <div className={styles.card}>
      <ul className={styles.content}>
        {details.map((detail) => {
          return (
            <>
              <i className={styles.item} onClick={() => detail.action()}>
                {detail.avatar && <img src={detail.avatar} />}
                <div className={styles.infoWrapper}>
                  <h2>{detail.name}</h2>
                  <p>{detail.description}</p>
                  <small>{detail.subdescription}</small>
                </div>
              </i>
              <hr className={styles.solid}></hr>
            </>
          );
        })}
      </ul>
    </div>
  );
};
