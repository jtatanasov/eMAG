<div id="product-page-container">
    <div id="product-container">
        <section id="product-header">
            <ul id="product-path">
                <li id="product-cathegory">{{ cathegory }}</li>
                <li id="product-subcathegory">
                    <a href="">{{ subcathegory }}</a>
                </li>
                <li id="product-type">
                    <a href="">{{ type }}</a>
                </li>
            </ul>
            <p id="product-name">{{ name }}</p>
            <hr />
        </section>
        <section id="product-body">
            <div id="product-image-container">
                <img id="product-main-image" src="{{main_url}}" alt="" />
            </div>

            <div id="product-user-menu">
                <div id="price-availability">
                    <p id="product-price">
                        <span>2598
                                <sup>99</sup>
                        </span>
                        лв.
                        </p>
                    <p id="product-availability" class="available">в наличност</p>
                </div>

                <div id="user-buttons">
                    <button id="add-to-cart">
                        <div>
                            <img id="cart-icon" class="icon" src="cart-icon.png" alt="" />
                        </div>
                        <span class="button-text"> Добави в количката</span>
                    </button>

                    <button id="add-to-favorites">
                        <span>
                            <img id="heart-icon" class="icon" src="heart-icon.png" alt="" />
                        </span>
                        <span class="button-text">
                            Добави в любими
                            </span>
                    </button>
                </div>
            </div>
        </section>
    </div>

    <div id="product-nav-container">
        <section id="product-nav">
            <ul>
                <li class="details">
                    <a href="#description">Описание</a>
                </li>
                <li class="details">
                    <a href="#specifics">Спецификации</a>
                </li>
            </ul>
        </section>
    </div>


    <section id="details-about-product-container">
        <div id="description-container">
            <div id="description" class="detailes-about-product">
                <h1>Описание</h1>
                <p>{{ description }}</p>
            </div>
        </div>

        <div id="specifics-container">
            <div id="specifics" class="detailes-about-product">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Спецификации
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <div id="buy-nav-container">
        <section id="buy-nav">
            <div id="buy-nav-div">
                <img class="buy-nav" src="" alt="" />
                <a class="buy-nav " href="">{{ name }}</a>
                <div id="add-to-cart-buy-nav-div">
                    <span class="buy-nav">
                        2598
                                <sup>99</sup>
                        лв.
                        </span>
                    <button class="buy-nav" id="buy-nav-button">
                        <div id="buy-nav-add-to-cart">
                            <img id="nav-cart-icon" class="icon" src="cart-icon.png" alt="" />
                        </div>
                        <span class="button-text" id="buy-nav-txt"> Добави в количката</span>
                    </button>
                </div>
            </div>
        </section>
    </div>

    <div id="sticky-navs">
        <div id="first-sticky-div"></div>
        <div id="second-sticky-div"></div>
    </div>
</div>