import styles from "./Payment.module.sass";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from './../Card/Card';

interface PaymentProps{
  register: any;
  errors: any;
}

const Payment: React.FC<any> = ( {register, errors}: PaymentProps ) => {

  return (
    <Tabs className={styles.payment}>
      <TabList className={styles.payment__top}>
        <Tab className={styles.payment__tab}>Credit card</Tab>
        <Tab className={styles.payment__tab}>Gift card</Tab>
        <Tab className={styles.payment__tab}>PayPal</Tab>
      </TabList>

      <TabPanel className={styles.payment__content}>
        <Card register={register} errors={errors}/>
      </TabPanel>
      <TabPanel className={styles.payment__content}>
        <a href="https://github.com/wanabeunique">Мой гитхаб :)</a>
      </TabPanel>
      <TabPanel className={styles.payment__content}>
      <a href="https://github.com/wanabeunique">И тут тоже мой гитхаб :)</a>
      </TabPanel>
    </Tabs>
  );
}

export default Payment