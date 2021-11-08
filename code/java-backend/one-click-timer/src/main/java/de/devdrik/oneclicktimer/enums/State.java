package de.devdrik.oneclicktimer.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum State {
    
    ON("on"), OFF("off");

    private String stateString;

    public static State toggle(State old) {
        return old.equals(State.OFF) ? State.ON : State.OFF;
    }

}
