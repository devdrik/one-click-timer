package de.devdrik.oneclicktimer.persistence.repositories;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import de.devdrik.oneclicktimer.persistence.models.WorkingTime;

import static org.springframework.data.jpa.domain.Specification.where;
import static de.devdrik.oneclicktimer.persistence.specifications.WorkingTimeSpecification.before;
import static de.devdrik.oneclicktimer.persistence.specifications.WorkingTimeSpecification.after;


public interface WorkingTimeRepository extends PagingAndSortingRepository<WorkingTime, Long>, JpaSpecificationExecutor<WorkingTime> {

    public Optional<WorkingTime> findTopByOrderByIdDesc();

    public default Optional<WorkingTime> findLatest() {
        return this.findTopByOrderByIdDesc();
    }

    public default Collection<WorkingTime> findAllBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return findAll(where(before(endDate).and(after(startDate))));
    }

}
