import "./team.css";

/**
 * Страница "О команде".
 */
export const Team = () => {
  return (
    <div>
      <div className="team_member__card">
        <img
          className="team_member__img-block"
          src="https://avatars.githubusercontent.com/u/62738324?v=4"
          alt="img"
        ></img>
        <div className="dictionary__text-block">
          <h3 className="team_member_text-block__title">Родион</h3>
          <span className="text-block__description">
            Реализовал дизайн приложения, аутентификацию (написать еще)
          </span>
        </div>
      </div>
      <div className="team_member__card">
        <img
          className="team_member__img-block"
          src="https://avatars.githubusercontent.com/u/43875392?v=4"
          alt="img"
        ></img>
        <div className="dictionary__text-block">
          <h3 className="team_member_text-block__title">Александра</h3>
          <span className="text-block__description">
            Реализовал игры (написать какие игры)
          </span>
        </div>
      </div>
      <div className="team_member__card">
        <img
          className="team_member__img-block"
          src="https://avatars.githubusercontent.com/u/60568968?v=4"
          alt="img"
        ></img>
        <div className="dictionary__text-block">
          <h3 className="team_member_text-block__title">Константин</h3>
          <span className="text-block__description">
            Реализовал игры (написать какие игры)
          </span>
        </div>
      </div>
      <div className="team_member__card">
        <img
          className="team_member__img-block"
          src="https://avatars.githubusercontent.com/u/1567811?v=4"
          alt="img"
        ></img>
        <div className="dictionary__text-block">
          <h3 className="team_member_text-block__title">Денис</h3>
          <span className="text-block__description">
            Настроил бекенд для приложения
          </span>
        </div>
      </div>
    </div>
  );
};
