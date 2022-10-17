/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, resp) => {
      if (resp && resp.success) {
        let select = this.element.querySelector(".accounts-select");
        select.innerHTML = resp.data.reduce((sumCash, curVal) => {
          sumCash += `<option value="${curVal.id}">${curVal.name}</option>`;
          return sumCash;
        }, '');
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        let type = this.element.querySelector('[name = type]').getAttribute('value');
        let typeModal = "new" + type[0].toUpperCase() + type.slice(1);
        App.getModal(typeModal).close();
        App.update();
      }
    });
  }
}