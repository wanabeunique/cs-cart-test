import { IItem } from "../../App";
import Payment from "../Payment/Payment";
import styles from "./Form.module.sass";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-modal";

interface ICard {
  number: string;
  name: string;
  cvc: number;
  expM: number;
  expY: number;
}

const customModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 20
  },
};


const Form: React.FC<{ items: IItem[] }> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICard>();

  const [isFormClicked, setIsFormClicked] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = (data: any) => {
    if (isChecked){
      alert(`
      Order successfully paid

      Card number: ${data.number}
      Name: ${data.name}
      CVC: ${data.cvc}
      Expiration: ${data.expM}/${data.expY}
      Total price: ${totalPrice}$
    `)
    }
  };

  const items: IItem[] = props.items;
  const [totalPrice, setTotalPrice] = useState(0);

  const shoppingMethond: any = {
    name: "FedEx",
    price: 13,
  };

  useEffect(() => {
    let calculatedPrice: number = items.reduce((acc, item) => {
      return Number(acc + item.price);
    }, 0);
    calculatedPrice += shoppingMethond.price;
    setTotalPrice(calculatedPrice);
  }, [items]);

  console.log(totalPrice);

  const modalContent = (
    <div>
      <h2>Гит хаб</h2>
      <a href="https://github.com/wanabeunique">
        Тут всё еще ссылка на мой гитхаб!<br/>
        Тут всё еще ссылка на мой гитхаб!<br/>
        Тут всё еще ссылка на мой гитхаб!<br/>
        Тут всё еще ссылка на мой гитхаб!<br/>
        Тут всё еще ссылка на мой гитхаб!<br/>
      </a>
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__container}>
        <p className="title">Checkout</p>
        <div className={`${styles.form__area}`}>
          <p className="title">Products</p>
          <div className={`${styles.form__content}`}>
            {items.map((item) => (
              <div className={`${styles.form__field}`} key={item.id}>
                <a href="#" className={`${styles.form__link}`}>
                  {item.name}
                </a>
                <p className={`${styles.form__subtitle}`}>{item.price}$</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.form__area}`}>
          <p className="title">Products</p>
          <div className={`${styles.form__content}`}>
            <div className={`${styles.form__field}`}>
              <p className={`${styles.form__subtitle}`}>
                {shoppingMethond.name}
              </p>
              <p className={`${styles.form__subtitle}`}>
                {shoppingMethond.price}$
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.form__area}`}>
          <p className="title">Products</p>
          <Payment register={register} errors={errors} />
        </div>
        <div className={`${styles.form__area} ${styles.form__area_politic}`}>
          <input
            className={styles.form__checkbox}
            type="checkbox"
            name=""
            id=""
            onChange={(e) => setIsChecked(e.target.checked)}
            checked={isChecked}
          />
          <p className={styles.form__subtitle}>
            I accept{" "}
            <button onClick={openModal} className={styles.form__modal}>Terms and Conditions</button>
            {!isChecked && isFormClicked && <p className={styles.form__error}>You must accept the Terms and Conditions</p>}
          </p>
        </div>
        <button 
        type="submit" 
        className={styles.form__order}
        onClick={() => setIsFormClicked(true)}
        >
          Place order ({totalPrice}$)
        </button>
      </div>
    </form>
      <Modal 
      className={styles.form__modal_content}
      isOpen={modalIsOpen} 
      onRequestClose={closeModal}
      style={customModal}
      >
      {modalContent}
    </Modal>
    </>
    
  );
};

export default Form;
