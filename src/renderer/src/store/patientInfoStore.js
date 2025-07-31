import { defineStore } from "pinia";

const usePatientInfoStore = defineStore('patient-info', {
    state: () => ({
        currentPatient: "blank",
        switchPatient: false,
        summaryContent: "",
        rawReport: "",
    }),
    actions: {
        setCurrentPatient(patient) {
            this.currentPatient = patient;
        },
        setSwitchPatient(switchPatient) {
            this.switchPatient = switchPatient;
        },
        setSummaryContent(summary) {
            this.summaryContent = summary;
        },
        setRawReport(report) {
            this.rawReport = report;
        }
    }
});

export default usePatientInfoStore;
