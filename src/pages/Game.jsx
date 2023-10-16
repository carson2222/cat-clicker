function Game() {
  return (
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="images/logo.png" alt="Cat Clicker Logo" class="logo__img" />
          <h1 class="logo__text">Cat Clicker</h1>
        </div>
        <ul class="nav">
          <li class="nav__item">
            <a href="#">Home</a>
          </li>
          <li class="nav__item">
            <a href="#">Clicker</a>
          </li>
          <li class="nav__item">
            <a href="#">Shop</a>
          </li>
          <li class="nav__item">
            <a href="#">Faq</a>
          </li>
          <li class="nav__item">
            <a href="#">Info</a>
          </li>
        </ul>
      </header>

      <main class="content">
        <div class="clicker">
          <img src="images/cat_transparent.png" alt="cat image" class="clicker__cat-img" />
          <div class="lvl">
            <div class="lvl__current">35</div>
            <div class="lvl__bar"></div>
          </div>
        </div>
        <div class="shop">
          <div class="shop__header">
            <p class="color-smallbox color-smallbox--orange color-smallbox--btn">Upgrades</p>
            <p class="color-smallbox color-smallbox--yellow color-smallbox--btn color-smallbox--inactive">Items</p>
            <p class="color-smallbox color-smallbox--green color-smallbox--btn color-smallbox--inactive">Quests</p>
          </div>
          <div class="shop__main">
            <div class="item-shop item-shop--upgrade">
              {/* <img
                src="https://dummyimage.com/500x500/000/fff"
                alt="Item image"
                class="item-shop__img"
              /> */}
              <div class="item-shop__text-box">
                <h3 class="item-shop__h3">Tytuł</h3>
                <p class="item-shop__p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolorem vero
                </p>
              </div>
              <div class="item-shop__buy-box">
                <p class="item-shop__price">50 🐟</p>
                <btn class="item-shop__buy-btn">Buy</btn>
              </div>
            </div>
            <div class="item-shop__item item-shop__item--shop"></div>
            <div class="item-shop__item item-shop__item--quest"></div>
            <div class="item-shop__item item-shop__item--quest"></div>
          </div>
          <div class="pagination">
            <p class="pagination__left">&larr;</p>
            <p class="pagination__right pagination--inactive">&rarr;</p>
          </div>
        </div>
      </main>
      <footer class="footer">
        <p class="footer__text"></p>
        <div class="footer__icons-box">
          {/* github
          discord
          linkedin */}
          <img src="images/github_icon.png" alt="Github icon" class="footer__icon footer__icon--github" />
          <img src="images/discord_icon.png" alt="Discord icon" class="footer__icon footer__icon--discord" />
          <img src="images/linkedin_icon.png" alt="Linkedin icon" class="footer__icon footer__icon--linkedin" />
        </div>
      </footer>
    </div>
  );
}
export default Game;