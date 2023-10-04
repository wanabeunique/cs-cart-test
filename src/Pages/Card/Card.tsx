import styles from "./Card.module.sass";

interface CardProps {
  register: any;
  errors: any;
}

const Card: React.FC<any> = ({ register, errors }: CardProps) => {


  const handleCvcChange = (event: any) => {
    if (event.target.value.length > 3) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }

  const handleNameKeyDown = (event: any) => {
    const allowedKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      " ",
    ];
  
    if (
      !/^[a-zA-Z\s]*$/.test(event.key) &&
      !allowedKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
  };

  const handleNumberKeyDown = (event: {
    keyCode: number;
    preventDefault: () => void;
  }) => {
    const allowedKeys = /[0-9]/;
    const char = String.fromCharCode(event.keyCode);
    if (!allowedKeys.test(char) && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const constExpChange = (event: any) => {
    const { value } = event.target;
    console.log(value, value.length);
    if (value.length > 2){
      console.log(value.length)
      event.target.value = value.slice(0, -1)
      console.log(event.target.value)
      return 0
    }
  }

  const handleNumberChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    console.log('123')
    if (value.length == 20){
      event.target.value = value.slice(0, -1)
      return 0
    }
    console.log('123456')
    const formattedValue = value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    event.target.value = formattedValue;
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__data}>
          <label className={styles.card__area}>
            <p className={styles.card__title}>
              Card number <span className="red">*</span>
            </p>
            <input
              {...register("number", {
                required: true,
                pattern:
                  /^(?:(4[0-9]{3}(?: [0-9]{4}){2}(?: [0-9]{3})?)|(5[1-5][0-9]{2}(?: [0-9]{4}){3})|(6(?:011|5[0-9]{2})(?: [0-9]{4}){3})|(3[47][0-9]{2}(?: [0-9]{4}){3})|(3(?:0[0-5]|[68][0-9])[0-9](?: [0-9]{4}){2})|((?:2131|1800|35[0-9]{2})(?: [0-9]{4}){2}[0-9]{2}))$/,
                  maxLength: 19,
              })}
              type="text"
              className={styles.card__input}
              aria-invalid={errors.number ? "true" : "false"}
              onKeyDown={handleNumberKeyDown}
              onChange={handleNumberChange}
            />
            {errors.number && <p className="text">Неправильный номер карты</p>}
          </label>
          <label className={styles.card__area}>
            <p className={styles.card__title}>
              Valid thru (mm/yy) <span className="red">*</span>
            </p>
            <div className={styles.card__area_time}>
              <input
                {...register("expM", {
                  required: true,
                  max: 12,
                  min: 1,
                  maxLength: 2,
                  minLength: 2,
                })}
                type="text"
                aria-invalid={errors.expY ? "true" : "false"}
                className={`${styles.card__input} ${styles.card__input_time}`}
                onKeyDown={handleNumberKeyDown}
                onChange={constExpChange}
              />
              <p className="title"> / </p>
              <input
                {...register("expY", {
                  required: true,
                  max: 99,
                  min: 1,
                  maxLength: 2,
                  minLength: 2,
                })}
                type="text"
                aria-invalid={errors.expY ? "true" : "false"}
                className={`${styles.card__input} ${styles.card__input_time}`}
                onKeyDown={handleNumberKeyDown}
                onChange={constExpChange}
              />
            </div>
            <div className={styles.card__errors}>
              {errors.expM && (
                <p className="text">Неправильный месяц окончания банковской карты</p>
              )}
              {errors.expY && (
                <p className="text">Неправильный Год окончания банковской карты</p>
              )}
            </div>
          </label>
          <label className={styles.card__area}>
            <p className={styles.card__title}>
              Cardholder's name <span className="red">*</span>
            </p>
            <input
              {...register("name", {
                required: true,
                pattern: /[A-Za-z]{3}/,
                maxLength: 128
              })}
              type="text"
              className={styles.card__input}
              onKeyDown={handleNameKeyDown}
            />
            {errors.name && (
              <p className="text">Недопустимое длина имени держателя карты</p>
            )}
          </label>
        </div>
        <div className={styles.card__cvc}>
          <label className={`${styles.card__area} ${styles.card__area_cvc}`}>
            <p className={styles.card__title}>
              CVV/CVC <span className="red">*</span>
            </p>
            <input
              {...register("cvc", {
                max: 999,
                min: 0,
                maxLenghth: 3,
                minLength: 3,
                required: true,
              })}
              onKeyDown={ handleNumberKeyDown}
              onChange={ handleCvcChange}
              type="text"
              className={`${styles.card__input} ${styles.card__input_cvc}`}
            />    

            {errors.cvc && (
              <p className="text">Недопустимое значение cvc</p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Card;
