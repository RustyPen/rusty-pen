#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_store::Builder::new().build())
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
    .invoke_handler(tauri::generate_handler![get_system_language, resize_window])
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

#[tauri::command]
fn get_system_language() -> String {
  use sys_locale::get_locale;
  
  let locale = get_locale().unwrap_or_else(|| "en".to_string());
  
  let lang_code = if locale.starts_with("zh") || locale.starts_with("zh_") {
    "zh"
  } else if locale.starts_with("en") || locale.starts_with("en_") {
    "en"
  } else {
    "en"
  };
  
  lang_code.to_string()
}

#[tauri::command]
fn resize_window(app: tauri::AppHandle, width: u32, height: u32) -> Result<(), String> {
  use tauri::Manager;
  
  if let Some(window) = app.get_webview_window("main") {
    window
      .set_size(tauri::Size::Physical(tauri::PhysicalSize { width, height }))
      .map_err(|e: tauri::Error| e.to_string())?;
    window.center().map_err(|e: tauri::Error| e.to_string())?;
    Ok(())
  } else {
    Err("Window not found".to_string())
  }
}
