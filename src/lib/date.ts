const getTodayRange = () => {
  const now = new Date()
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
  const endOfDay =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1
  return { startOfDay, endOfDay }
}

export { getTodayRange }
