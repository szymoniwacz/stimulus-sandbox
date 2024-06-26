import Rails from "@rails/ujs";
Rails.start();

import * as ActiveStorage from "@rails/activestorage";
ActiveStorage.start();

import "@hotwired/turbo-rails";
import "./controllers";
