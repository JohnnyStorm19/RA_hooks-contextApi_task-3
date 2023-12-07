import classes from './ContentCard.module.css';
import { IContentCard } from "../../models";

const ContentCard = ({ data }: { data: IContentCard }) => {
  return (
    <div>
      <div className={classes.imgContainer}>
        <img src={data.image} alt="" />
      </div>
      <h2>{data.title}</h2>
      <p className={classes.cardContent}>{data.content}</p>
    </div>
  );
};

export default ContentCard;
