export default class ReportFactory {
  createDailyReport (timestamp, vivacity, mood, irritability, anxiety, therapy, medications, notes, sleepHours) {
    return new DailyReport(timestamp, vivacity, mood, irritability, anxiety, therapy, medications, notes, sleepHours)
  }
}

class DailyReport {
  constructor (
    timestamp = null,
    vivacity = null,
    mood = null,
    irritability = null,
    anxiety = null,
    therapy = null,
    medications = null,
    notes = null,
    sleepHours = 8
  ) {
    this.timestamp = timestamp || this.getTodayDate()
    this.vivacity = vivacity
    this.mood = mood
    this.irritability = irritability
    this.anxiety = anxiety
    this.therapy = therapy
    this.medications = medications
    this.notes = notes
    this.sleepHours = sleepHours
  }

  getReport () {
    return {
      timestamp: this.timestamp,
      vivacity: this.vivacity,
      mood: this.mood,
      irritability: this.irritability,
      anxiety: this.anxiety,
      therapy: this.therapy,
      medications: this.medications,
      notes: this.notes,
      sleepHours: this.sleepHours
    }
  }

  getTimestamp () {
    return this.timestamp
  }

  getTodayDate () {
    const today = new Date()

    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    return today.getTime()
  }
}
