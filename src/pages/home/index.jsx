import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Language from '../../components/language';
import Item from './featureItem';
import FunctionItem from './functionItem';
import homeConfig from '../../../site_config/home';
import './index.scss';

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });
  }

  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType } = this.state;
    const headerLogo = headerType === 'primary' ? '/img/OpenYurt.png' : '/img/OpenYurt.png';
    return (
      <div className="home-page">
        <section className="top-section">
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="vertical-middle">
            <div className="product-name">
              <h2>{dataSource.brand.brandName}</h2>
            </div>
            <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
            <div className="button-area">
            {
              dataSource.brand.buttons.map(b => <Button type={b.type} key={b.type} link={b.link} target={b.target}>{b.text}</Button>)
            }
            </div>
          </div>
          <div className="animation animation1" />
          <div className="animation animation2" />
          <div className="animation animation3" />
          <div className="animation animation4" />
          <div className="animation animation5" />
        </section>
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.introduction.title}</h3>
              <p>{dataSource.introduction.desc}</p>
            </div>
            <img src={getLink(dataSource.introduction.img)} />
          </div>
        </section>
        <section className="function-section">
            <h3>{dataSource.functions.title}</h3>
            <div>
                {
                    dataSource.functions.list.map((func, i) => (
                        <FunctionItem func={func} key={i} imgFirst={i % 2 === 0} />
                    ))
                }
            </div>
        </section>
        <section className="feature-section">
          <div className="feature-section-body">
            <h3>{dataSource.features.title}</h3>
            <ul>
            {
              dataSource.features.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))
            }
            </ul>
          </div>
        </section>
        <section className="cloud-native-section">
          <div className="container">
            <img src="https://d33wubrfki0l68.cloudfront.net/ea0d91fac8683c38ea9a1fb8a4e9914627ac6aae/8efa9/img/logos/cloud-native-computing.svg" />
            <p dangerouslySetInnerHTML={{ __html: dataSource.cloudNative }} />
          </div>
        </section>
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
