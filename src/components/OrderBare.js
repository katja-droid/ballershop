import React from 'react';
import styles from './OrderSubmitForm.module.css';

function OrderSubmitForm(props) {
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    name: '',
    surname: '',
    address: ''
  }); //дані записані в форму 

  const handleChange = (e) => { //функція яка реагує на зміну даних в інпутах
    const { name, value } = e.target; //із інпута, в якому міняються дані, ф-я бере name (що там за дані) та value (самі дані)
    setFormValues({ ...formValues, [name]: value }); //записує їх у стейти з даними
    console.log(formValues)
    console.log(validate(formValues));
  };
  const validate = (values) => {//перевірка на валідність даних
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //рядок, потім собачка, потім знову рядок
    const regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/; //забезпечуємо щоб були цифри, можна також дужки і +
    const regexName = /^[a-zA-Z ]{2,30}$/; //можна ввести рядок, від 2 до 30 символів
    const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/; //рядок, можна цифри, обмеження на символи нема
 
    if (!values.email) { //якщо у переданих знач. нема емейлу
      errors.email = "Email is required!"; //записуємо у список помилок що необхідно ввести його
    } else if (!regexEmail.test(values.email)) { //інакше якщо дані не валідні додаємо відповідну помилку
      errors.email = "This is not a valid email format!";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required!";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "This is not a valid phone number!";
    }

    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!regexName.test(values.name)) {
      errors.name = "This is not a valid name!";
    }

    if (!values.surname) {
      errors.surname = "Surname is required!";
    } else if (!regexName.test(values.surname)) {
      errors.surname = "This is not a valid surname!";
    }

    if (!values.address) {
      errors.address = "Address is required!";
    } else if (!regexAddress.test(values.address)) {
      errors.address = "This is not a valid address!";
    }

    return errors;
  };

  if (isSubmitted) {
    // Render success message
    return <div className={styles.successMessage}>Order Submitted!</div>;
  }
  const [formErrors, setFormErrors] = useState({}); //помилки що виникли при аналізі заповнених даних
  const [isSubmitted, setIsSubmitted] = useState(false); //цей стейт позначає, чи була відправлена форма
  return (
    <div className={styles.submitForm}>
      <form>
        <h2>Marketplace Form</h2>
        <div className={styles.formControl}>
          <label className={styles.label}>Email:</label>
          <br/>
          <input type="email" name="email" className={styles.input}  onChange={handleChange} />
          <p className={styles.error}></p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Phone:</label>
          <br/>
          <input type="text" name="phone" className={styles.input}  onChange={handleChange}/>
          <p className={styles.error}></p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Name:</label>
          <br/>
          <input type="text" name="name" className={styles.input} onChange={handleChange}/>
          <p className={styles.error}></p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Surname:</label>
          <br/>
          <input type="text" name="surname" className={styles.input} onChange={handleChange}/>
          <p className={styles.error}></p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>Address:</label>
          <br/>
          <input type="text" name="address" className={styles.input} onChange={handleChange}/>
          <p className={styles.error}></p>
        </div>
        <button type="submit" className={styles.button} >Submit</button>
      </form>
    </div>
  );
}

export default OrderSubmitForm;
