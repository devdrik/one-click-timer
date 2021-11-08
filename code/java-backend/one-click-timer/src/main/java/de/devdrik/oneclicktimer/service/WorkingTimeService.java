package de.devdrik.oneclicktimer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.devdrik.oneclicktimer.enums.State;
import de.devdrik.oneclicktimer.persistence.models.WorkingTime;
import de.devdrik.oneclicktimer.persistence.repositories.WorkingTimeRepository;

@Service
public class WorkingTimeService {

    private WorkingTimeRepository workingTimeRepository;

    @Autowired
    WorkingTimeService(WorkingTimeRepository workingTimeRepository) {
        this.workingTimeRepository = workingTimeRepository;
    }
    
    public String toggleTimer() {
        WorkingTime lastWorkingTime = workingTimeRepository.findLatest().orElse(new WorkingTime(State.OFF));
        State toggledState = State.toggle(lastWorkingTime.getState());
        WorkingTime newWorkingTime = new WorkingTime(toggledState);

        WorkingTime savedWorkingTime = workingTimeRepository.save(newWorkingTime);

        return savedWorkingTime.getState().getStateString();
    }

    public Iterable<WorkingTime> findAll() {
        return workingTimeRepository.findAll();
    }
}
