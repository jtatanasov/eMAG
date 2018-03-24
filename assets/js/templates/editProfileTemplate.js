<div id='user-menu'>
    <div id='profile-options'>
        <ul>
            <li>Лични данни</li>
            <li>Моите поръчки</li>
            <li>Любими продукти</li>
        </ul>
    </div>
    <div id='profile-option-content'>
        <h3>Моите данни</h3>
        <section>
            <form id='edit-profile'>
                <div class='labels'>
                    <label for="title">Обръщание</label>
                </div>
                <div class='inputs'>
                    <input id='titleMr' type="radio" value='mr' name='title'/>
                    <label>Г-н</label>
                    <input id='titleMrs' type="radio" value='mrs' name='title'/>
                    <label>Г-жа</label>
                    <input id='titleMiss' type="radio" value='miss' name='title'/>
                    <label>Г-жица</label>
                </div>
                <div class='labels'>
                    <label for="fullname">Име и фамилия</label>
                </div>
                <div class='inputs'>
                    <input id='fullname' type="text" value="{{fullname}}"/>
                </div>

                <div class='labels'>
                    <label for="mobile-number">Мобилен телефон</label>
                </div>
                <div class='inputs'>
                    <input id='mobile-number' type="text" value="{{phoneNumber}}"/>
                </div>


                <button id='save-profile-edits-btn'>Запази</button>
            </form>
        </section>

        <h3>Адрес</h3>
        <section>
            {{#if address}}
                <p>{{adress}}</p>
                <button class='address-buttons' id='edit-address'>редактирай</button>
                <button class='address-buttons' id='delete-address'>изтрий</button>
            {{/if}}
            {{#unless adress}}
                <p>Не си добавил адрес за доставка. Можеш да го направиш от долния бутон</p>
                <button class='address-buttons' id='add-address'>&CirclePlus; Добави адрес</button>
            {{/unless}}
        </section>

        <h3>Промяна на email адрес</h3>
        <section>
            <p id='current-email'>Настоящ email адрес: {{email}}</p>
            <form>
                <div class='labels'>
                    <label for='new-email'>Нов email адрес</label>
                </div>
                <div class='inputs'>
                    <input type='email' id='new-email'/>
                </div>
                <div class='labels'>
                    <label for='confirm-new-email'>Потвърди email адрес</label>
                </div>
                <div class='inputs'>
                    <input type='email' id='confirm-new-email'/>
                </div>

                <button id='save-new-email'>Запази</button>
            </form>
        </section>

        <h3>Промяна на парола</h3>
        <section>
            <form>
                <div class='labels'>
                    <label for='new-password'>Нова парола</label>
                </div>
                <div class='inputs'>
                    <input type='password' id='new-password'/>
                </div>
                <div class='labels'>
                    <label for='confirm-password'>Потвърди парола</label>
                </div>
                <div class='inputs'>
                    <input type='password' id='confirm-password'/>
                </div>

                <button id='save-new-password'>Запази</button>
            </form>
        </section>
    </div>
</div>