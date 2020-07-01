import React from 'react';
import chest from '../images/chest.png';
import searchTerms from '../SearchTerms/SearchTerms'
import AppContext from '../AppContext'
import AccountValue from '../AccountValue/AccountValue'
import { Link } from 'react-router-dom'

export default class ChestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenButtonClick = this.handleOpenButtonClick.bind(this);
  }

  static contextType = AppContext;

  handleOpenButtonClick = () => {
    const itemQuery = this.chooseItemQuery();
    console.log(`Item query: ${itemQuery}`);

    this.props.history.push('/loading');

    this.context.getItems(itemQuery)
      .then((items) => {
        const item = items[Math.floor(Math.random() * items.length)];

        this.buildItem(item);
        this.props.history.push('/newItem');
      });
  }

  chooseItemQuery = () => {
    const rarityModifier = this.generateRarityModifier();
    let materialScore = this.generateScore(rarityModifier);

    const categorySelect = this.getRandomInt(0, Object.keys(searchTerms.collection).length - 1);
    const materialSelect = this.generateRarity(materialScore, rarityModifier);

    let category = Object.keys(searchTerms.collection)[categorySelect];
    if (category !== 'Weapons' || category !== 'Armor') {
      const roll = Math.random() * 19;
      category = roll <= 8 ? 'Weapon' :
        roll >= 10 ? 'Armor' : category
    }

    const materialsLength = searchTerms.collection[category]['materials'][materialSelect].length - 1;
    const subcategoriesLength = searchTerms.collection[category]['subCategories'].length - 1;

    const itemName = searchTerms.collection[category]['subCategories'][this.getRandomInt(0, subcategoriesLength)];
    const material = searchTerms.collection[category]['materials'][materialSelect][this.getRandomInt(0, materialsLength)];

    return `${itemName} ${material}`
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  buildItem(item) {

    //determine itemName
    //the replace and split combo is cutting the string off at the first '\s'(space) after 30 characters
    let itemName = item.title.replace(/.{25}\S*\s+/g, "$&@").split(/\s+@/)[0];
    itemName = this.titleCase(itemName);
    itemName = itemName.replace(/Ethnic|For|Free|By|,|And|With|Discount|%|!/gi, "")

    //determine materials
    let materials = '';
    if (item.materials.length === 0) {
      materials = 'N/A';
    } else if (item.materials.length === 1) {
      materials = item.materials[0];
    } else {
      materials = item.materials.join(", ");
    }

    materials = materials.replace(/.{100}\S*\s+/g, "$&@").split(/\s+@/)[0];

    //determine category
    const category = item.taxonomy_path[item.taxonomy_path.length - 1];
    //determine url
    const url = item.url;
    //determine score
    let score = Math.ceil((item.price / 10) * (item.price / 10));

    //determine description
    //need to make the description cut off at the period after 200 chars
    let description = item.description.replace(/.{100}\S*\s+/g, "$&@").split(/\s+@/)[0];
    description = description.replace(/Ethnic|For|Free|By|Shipping/gi, "")

    console.log(item);

    this.context.getImage(item.listing_id) //determine image
      .then((img) => {
        const newItem = {
          id: item.listing_id,
          img,
          itemName,
          category,
          materials,
          score,
          description,
          url
        }
        this.context.setNewItem(newItem);
      });
  }

  generateScore(mod) {
    let score = this.getRandomInt(0, 1000);
    score += mod;

    score = (score < mod * 1.5) ? score + mod + 300 : score;
    score = (score > 1000) ? 1000 : score;

    return score;
  }

  generateRarity(score, mod) {
    let rarity = 1;

    if (score < 499)
      rarity = 1;
    else if (score >= 500 && score <= 699)
      rarity = 2;
    else if (score >= 700 && score <= 799)
      rarity = 3;
    else if (score >= 800 && score <= 859)
      rarity = 4;
    else if (score >= 860 && score <= 899)
      rarity = 5;
    else if (score >= 900 && score <= 934)
      rarity = 6;
    else if (score >= 935 && score <= 969)
      rarity = 7;
    else if (score >= 970 && score <= 984)
      rarity = 8;
    else if (score >= 985 && score <= 994)
      rarity = 9;
    else if (score >= 995 && score <= 1000)
      rarity = 10;

    rarity = (rarity < (mod / 100) * 1.6) ? rarity += 3 : rarity;
    rarity = (rarity > 10) ? 10 : rarity;

    return rarity;
  }

  generateRarityModifier() {
    const seed = this.getRandomInt(0, 1000);
    let mod =
      (seed < 899) ? 0 :
        (seed > 900 && seed < 939) ? 100 :
          (seed > 940 && seed < 969) ? 200 :
            (seed > 970 && seed < 989) ? 300 : 400;

    return mod;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    return (
      <div className="container center-main">
        <section className="item top-left-img">
        </section>
        <section className="item top-center-img">
          <img src={chest} alt="chest"></img>
        </section>
        <section className="item top-right-img">
        </section>
        <section className="item bottom-left-img">
          <Link to={'/stash'}>
            <button>Stash</button>
          </Link>
        </section>
        <section className="item bottom-center-img">
          <button onClick={this.handleOpenButtonClick}>Open</button>
        </section>
        <section className="item bottom-right-img">
          <AccountValue />
        </section>
      </div>
    );
  }
}


//Use for old graphical layout

// import searchTerms from '../SearchTerms/SearchTerms'
// import tossButton from '../images/toss-button.png';
// import keepButton from '../images/keep-button.png';
// import bottomLeft from '../images/bottom-left.png';
// import bottomRight from '../images/bottom-right.png';
// import openButton from '../images/open-button.png';

/* <div className="container center-main">
        <section className="item top-left-img">
          <img src={tossButton} alt="toss-button"></img>
        </section>
        <section className="item top-center-img">
          <img src={chest} alt="chest"></img>
        </section>
        <section className="item top-right-img">
          <img src={keepButton} alt="keep-button"></img>
        </section>
        <section className="item bottom-left-img">
          <img src={bottomLeft} alt="bottom-left-img"></img>
        </section>
        <section className="item bottom-center-img">
          <img src={openButton} alt="open-button"></img>
        </section>
        <section className="item bottom-right-img">
          <img src={bottomRight} alt="bottom-right-img"></img>
        </section>
      </div> */