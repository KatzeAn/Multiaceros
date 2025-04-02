import { createI18n } from 'vue-i18n'
import frpayroll from '@/i18n/locales/fr/PayrollHistory.json'
import espayroll from '@/i18n/locales/es/PayrollHistory.json'
import enpayroll from '@/i18n/locales/en/PayrollHistory.json'

import frsidebar from '@/i18n/locales/fr/sidebar.json'
import essidebar from '@/i18n/locales/es/sidebar.json'
import ensidebar from '@/i18n/locales/en/sidebar.json'

import frhome from '@/i18n/locales/fr/home.json'
import esshome from '@/i18n/locales/es/home.json'
import enhome from '@/i18n/locales/en/home.json'

import frInformacionPersonalView from '@/i18n/locales/fr/InformacionPersonalView.json'
import esInformacionPersonalView from '@/i18n/locales/es/InformacionPersonalView.json'
import enInformacionPersonalView from '@/i18n/locales/en/InformacionPersonalView.json'

import frAbsenceRequestForm from '@/i18n/locales/fr/AbsenceRequestForm.json'
import esAbsenceRequestForm from '@/i18n/locales/es/AbsenceRequestForm.json'
import enAbsenceRequestForm from '@/i18n/locales/en/AbsenceRequestForm.json'

import frupdateDataView from '@/i18n/locales/fr/updateDataView.json'
import esupdateDataView from '@/i18n/locales/es/updateDataView.json'
import enupdateDataView from '@/i18n/locales/en/updateDataView.json'

import frmanageEmployeesView from '@/i18n/locales/fr/manageEmployeesView.json'
import esmanageEmployeesView from '@/i18n/locales/es/manageEmployeesView.json'
import enmanageEmployeesView from '@/i18n/locales/en/manageEmployeesView.json'

import fredit from '@/i18n/locales/fr/edit.json'
import esedit from '@/i18n/locales/es/edit.json'
import enedit from '@/i18n/locales/en/edit.json'

import frmanageApplications from '@/i18n/locales/fr/manageApplications.json'
import esmanageApplications from '@/i18n/locales/es/manageApplications.json'
import enmanageApplications from '@/i18n/locales/en/manageApplications.json'

import frAbsences  from '@/i18n/locales/fr/Absences.json'
import esAbsences from '@/i18n/locales/es/Absences.json'
import enAbsences from '@/i18n/locales/en/Absences.json'

import frdashboardView from '@/i18n/locales/fr/dashboardView.json'
import esdashboardView from '@/i18n/locales/es/dashboardView.json'
import endashboardView from '@/i18n/locales/en/dashboardView.json'

import frApplications from '@/i18n/locales/fr/Applications.json'
import esApplications from '@/i18n/locales/es/Applications.json'
import enApplications from '@/i18n/locales/en/Applications.json'

import frlogin from '@/i18n/locales/fr/login.json'
import eslogin from '@/i18n/locales/es/login.json'
import enlogin from '@/i18n/locales/en/login.json'

import frnotifications from '@/i18n/locales/fr/notifications.json'
import esnotifications from '@/i18n/locales/es/notifications.json'
import ennotifications from '@/i18n/locales/en/notifications.json'

import frrules from '@/i18n/locales/fr/rules.json'
import esrules from '@/i18n/locales/es/rules.json'
import enrules from '@/i18n/locales/en/rules.json'

const savedLanguage = localStorage.getItem('lang') || 'es'; 
const i18n = createI18n({
  legacy: false,
  locale: savedLanguage, 
  fallbackLocale: 'es',
  messages: {
    es: {
      ...espayroll,
      ...essidebar,
      ...esshome,
      ...esInformacionPersonalView,
      ...esAbsenceRequestForm,
      ...esupdateDataView,
      ...esmanageEmployeesView,
      ...esedit,
      ...esmanageApplications,
      ...esAbsences,
      ...esdashboardView,
      ...esApplications,
      ...eslogin,
      ...esnotifications,
      ...esrules,
    },
    en: {
      ...enpayroll,
      ...ensidebar,
      ...enhome,
      ...enInformacionPersonalView,
      ...enAbsenceRequestForm,
      ...enupdateDataView,
      ...enmanageEmployeesView,
      ...enedit,
      ...enmanageApplications,
      ...enAbsences,
      ...endashboardView,
      ...enApplications,
      ...enlogin,
      ...ennotifications,
      ...enrules,
    },
    fr: {
      ...frpayroll,
      ...frsidebar,
      ...frhome,
      ...frInformacionPersonalView,
      ...frAbsenceRequestForm,
      ...frupdateDataView,
      ...frmanageEmployeesView,
      ...fredit,
      ...frmanageApplications,
      ...frAbsences,
      ...frdashboardView,
      ...frApplications,
      ...frlogin,
      ...frnotifications,
      ...frrules,
    }
  }
});

export default i18n;