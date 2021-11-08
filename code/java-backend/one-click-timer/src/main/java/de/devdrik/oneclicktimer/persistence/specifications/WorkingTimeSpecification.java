package de.devdrik.oneclicktimer.persistence.specifications;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import de.devdrik.oneclicktimer.persistence.models.WorkingTime;

public class WorkingTimeSpecification {

    public static Specification<WorkingTime> before(LocalDateTime date) {
        return (workingTimeEntry, criteriaQuery, criteriaBuilder) -> date == null ? null
                : criteriaBuilder.lessThanOrEqualTo(workingTimeEntry.get("createdDate"), date);
    }

    public static Specification<WorkingTime> after(LocalDateTime date) {
        return (workingTimeEntry, criteriaQuery, criteriaBuilder) -> date == null ? null
                : criteriaBuilder.greaterThanOrEqualTo(workingTimeEntry.get("createdDate"), date);
    }
    
}
