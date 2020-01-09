/*
Source:
https://stackoverflow.com/questions/11529247/in-html5-how-can-i-keep-an-android-device-s-screen-on/59558863?noredirect=1#comment105285915_59558863

*/

import { html, css, LitElement } from 'lit-element';

export class MilNoSleep extends LitElement {
  static get styles() {
    return css`
      #player {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      hidden: { type: String },
      visibilityChange: { type: Number },
      isPlaying: { type: Number },
      videoPlayer: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(this.visibilityChange, () => this._handleVisibilityChange());
    window.addEventListener('online', () => this._handleOnlineChange());
    window.addEventListener('offline', () => this._handleOnlineChange());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(this.visibilityChange, () => this._handleVisibilityChange());
    window.removeEventListener('online', () => this._handleOnlineChange());
    window.removeEventListener('offline', () => this._handleOnlineChange());
  }

  constructor() {
    super();
    // Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }
  }

  firstUpdated() {
    this.videoPlayer = this.shadowRoot.getElementById('player');
  }

  render() {
    return html`
      <video id="player" playsinline on-ended="videoEnded" muted>
        <source
          type="video/webm"
          src="data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA="
        />
        <source
          type="video/mp4"
          src="data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=="
        />
      </video>
    `;
  }

  _handleOnlineChange() {
    if (!this.isPlaying) return false;
    // Video playing is reset on online state changes..
    this.disableSleepMode();
    return false;
  }

  _handleVisibilityChange() {
    // Browsers usually re-enable sleep mode when tab is changed or window is minimized.
    // This methods reset video playing when such an action occurs.
    if (!this.isPlaying) return false;
    if (document.hidden) {
      // Document is minimized or tab is changed, do nothing.
    } else {
      // reset video playing.
      this.disableSleepMode();
    }
    return false;
  }

  disableSleepMode() {
    this.videoPlayer.pause();
    this.videoPlayer.load();
    this.videoPlayer.play();
    this.isPlaying = true;
    this.dispatchEvent(
      new CustomEvent('sleepModeDisabled', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  _videoEnded() {
    this.videoPlayer.pause();
    this.isPlaying = false;
    this.disableSleepMode();
  }

  enableSleepMode() {
    this.videoPlayer.pause();
    this.isPlaying = false;
    this.dispatchEvent(
      new CustomEvent('sleepModeEnabled', {
        bubbles: true,
        composed: true,
      }),
    );
  }
}
