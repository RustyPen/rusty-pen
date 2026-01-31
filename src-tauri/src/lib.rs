#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .menu(|app| {
      use tauri::menu::{Menu, MenuItem, Submenu};

      let menu = Menu::new(app)?;

      let app_menu = Submenu::new(app, "Rusty Pen", true)?;
      let settings_item = MenuItem::with_id(app, "settings", "设置", true, None::<String>)?;
      let about_item = MenuItem::with_id(app, "about", "关于", true, None::<String>)?;

      app_menu.append_items(&[&settings_item, &about_item])?;
      menu.append(&app_menu)?;

      Ok(menu)
    })
    .on_menu_event(|app, event| {
      use tauri::Emitter;
      match event.id.as_ref() {
        "settings" => {
          let _ = app.emit("open-settings", ());
        }
        "about" => {
          let _ = app.emit("open-about", ());
        }
        _ => {}
      }
    })
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
