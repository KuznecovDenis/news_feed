import {MainArticle} from "./MainArticle.js";
import {SmallArticle} from "./SmallArticle.js";

export const Articles = ({articles}) => {
    return (
            <section className="articles">
                <div className="container grid">
                    <section className="articles__big-column">
                        {articles.items.slice(0, 3).map(item => {
                            return <MainArticle
                                key={item.id}
                                category={articles.categories.find(({id}) => item.category_id === id).name}
                                source={articles.sources.find(({id}) => item.source_id === id).name}
                                {...item}
                            />})
                        }
                    </section>

                    <section className="articles__small-column">
                        {articles.items.slice(3, 12).map(item => {
                            return  <SmallArticle
                                key={item.id}
                                source={articles.sources.find(({id}) => item.source_id === id).name}
                                {...item}
                            />})
                        }
                    </section>
                </div>
            </section>
    )
}