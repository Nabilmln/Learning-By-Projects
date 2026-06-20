function Settings({ settings, setSettings }) {
  return (
    <div className="settings">
      <h3>Settings</h3>

      <div>
        <label>Work Duration</label>

        <input
          aria-label="work duration"
          type="number"
          value={settings.work}
          onChange={(e) =>
            setSettings({
              ...settings,
              work: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label>Short Break</label>

        <input
          aria-label="work duration"
          type="number"
          value={settings.shortBreak}
          onChange={(e) =>
            setSettings({
              ...settings,
              shortBreak: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label>Long Break</label>

        <input
          aria-label="work duration"
          type="number"
          value={settings.longBreak}
          onChange={(e) =>
            setSettings({
              ...settings,
              longBreak: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}

export default Settings;
