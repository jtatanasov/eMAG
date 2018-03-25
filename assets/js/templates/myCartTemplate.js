<div id='user-menu'>
    <div id='profile-options'>
        <ul>
            <li id='option-personal-data'>Лични данни</li>
            <li id='option-my-orders'>Моите поръчки</li>
            <li id='option-my-favs'>Любими продукти</li>
            <li id='option-my-cart'>Моята количка</li>
        </ul>
    </div>
    <div id='profile-option-content'>
        <div id='view-orders'>
            <h3>Мояте количка</h3>
            <section>
                {{#if cart}}
                <table>
                    {{#each cart}}
                  
                    {{/ each}}
                    {{ else}}
                    <div id='no-orders'>Нямате добавени продукти в количката!</div>
                    {{/if}}
                </table>
            </section>
        </div>
    </div>
</div>