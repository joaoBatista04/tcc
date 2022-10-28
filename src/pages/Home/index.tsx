import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  IonChip,
  IonContent,
  IonItem,
  IonList,
  IonSearchbar,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonIcon,
  IonImg,
  IonBackButton,
  IonButton,
  IonFooter,
} from '@ionic/react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import {
  FIRST_PAGE_INDEX,
  MAX_PER_PAGE,
  PAGE_STEP_SIZE,
} from 'constants/pagination';
import paths from 'constants/paths';
import { PlayerKeys } from 'constants/player';
import { useTranslation } from 'hooks/Translation';
import { MenuLayout } from 'layouts';
import { Words } from 'models/dictionary';
import PlayerService from 'services/unity';
import { RootState } from 'store';
import { Creators } from 'store/ducks/dictionary';

import { Strings } from './strings';

import './styles.css';
import { Medication } from 'components';
import { IconAddFilled } from 'assets';

const playerService = PlayerService.getService();

export interface IMedication {
  name: any;
  frequency: any;
  duration: any;
  observations: any;
}

function HomePage() {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentMedicationName = useSelector(
    ({ medication }: RootState) => medication.name,
  );

  const currentMedicationFrequency = useSelector(
    ({ medication }: RootState) => medication.frequency,
  );

  const currentMedicationDuration = useSelector(
    ({ medication }: RootState) => medication.duration,
  );

  const currentMedicationObservations = useSelector(
    ({ medication }: RootState) => medication.observation,
  );

  const currentMedicationData = useSelector(
    ({ medication }: RootState) => medication.medicationData,
  );

  //Medication Modal
  //const [showModal, setShowModal] = useState(false);

  //Medication List state
  const [medicationList, setMedicationList] = useState<IMedication[]>([]);
  const [medicationName, setMedicationName] = useState<any>(
    currentMedicationName,
  );
  const [medicationFrequency, setmedicationFrequency] = useState<any>(
    currentMedicationFrequency,
  );
  const [medicationDuration, setMedicationDuration] = useState<any>(
    currentMedicationDuration,
  );
  const [medicationObservations, setMedicationObervations] = useState<any>(
    currentMedicationObservations,
  );

  const [medicationListTest, setMedicationListTest] = useState<IMedication[]>(
    [],
  );
  const [medicationNameTest, setMedicationNameTest] = useState<string>(
    currentMedicationName,
  );
  const [medicationFrequencyTest, setmedicationFrequencyTest] = useState<any>(
    currentMedicationFrequency,
  );
  const [medicationDurationTest, setMedicationDurationTest] = useState<any>(
    currentMedicationDuration,
  );
  const [medicationObservationsTest, setMedicationDoObservationsst] =
    useState<any>(currentMedicationObservations);

  //FIXED HOME MEDICATION
  const testMedication = {
    name: currentMedicationName,
    frequency: currentMedicationFrequency,
    duration: currentMedicationDuration,
    observations: currentMedicationObservations,
  };

  const addMedication = (): void => {
    const newMedication = {
      name: currentMedicationName,
      frequency: currentMedicationFrequency,
      duration: currentMedicationDuration,
      observations: currentMedicationObservations,
    };

    setMedicationName(currentMedicationName);
    setmedicationFrequency(currentMedicationFrequency);
    setMedicationDuration(currentMedicationDuration);
    setMedicationObervations(currentMedicationObservations);
    setMedicationList([...medicationList, newMedication]);

    console.log(medicationList);
  };

  const deleteMedication = (medicationToBeDeleted: string): void => {
    setMedicationList(
      medicationList.filter(medication => {
        return medication.name !== medicationToBeDeleted;
      }),
    );
  };

  return (
    <MenuLayout
      title={Strings.TOOLBAR_TITLE}
      mode={location.pathname === paths.DICTIONARY ? 'menu' : 'menu'}
    >
      <IonContent class="home-container">
        <div className="home-content">
          <IonText class="home-content-title">Medicamentos</IonText>
          <Medication
            medication={testMedication}
            deleteMedication={deleteMedication}
          ></Medication>
          <IonList class="home-medication-list">
            {medicationList.map((item: IMedication, key: number) => (
              <Medication
                key={key}
                medication={item}
                deleteMedication={deleteMedication}
              ></Medication>
            ))}
          </IonList>
        </div>
      </IonContent>
      <button className="home-add-medicine-button" onClick={addMedication}>
        <img src={IconAddFilled} alt="" />
      </button>
      <IonFooter class="home-bottom-container">
        <IonButton onClick={() => console.log('Traduzir bundle')}>
          Traduzir
        </IonButton>
      </IonFooter>
    </MenuLayout>
  );
}

export default HomePage;
